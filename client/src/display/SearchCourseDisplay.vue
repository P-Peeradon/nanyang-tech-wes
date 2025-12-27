<template>
    <form>
        <h2 class="course-header">Search Course</h2>
        <div class="course-search-bar">
            <div class="course-input">
                <label for="code">By Course Code</label>
                <input type="text" name="code" id="code" v-model="code" />
            </div>

            <div class="course-input">
                <label for="code">By Course Title</label>
                <input type="text" name="code" id="code" v-model="title" />
            </div>
        </div>
        <!--
        <DataTable
            :value="courses"
            showGridlines
            table-style="min-width: 40px"
            paginator
            :rows="10"
            :rowsPerPageOptions="[10, 20, 40, 60]"
        >
            <Column field="code" header="Course Code"></Column>
            <Column field="title" header="Course Title"></Column>
            <Column field="au" header="AUs"></Column>
            <Column>
                <template #body="{ data }">
                    <button class="primary-button" @click.prevent="enrolInCourse(data.code)">
                        Enrol
                    </button>
                </template>
            </Column>
        </DataTable>
    -->

    <div>
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender
                            v-if="!header.isPlaceholder"
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <!-- Data Exist-->
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableCell :colspan="columns.length" class="h-24 text-center">No results.</TableCell>
                </template>
            </TableBody>
        </Table>
    </div>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { courseStore } from '../stores/stars';
import { type ICourse } from '../../../server/utility/course';
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import columns from '@/columns/searchCourse'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const courseState = courseStore();

const code = ref<string>('');
const title = ref<string>('');
const courses = computed<ICourse[]>(() => {
    const allCourses = courseState?.allCourses ?? [];

    return allCourses.filter((course: ICourse) => {
        if (!course) return false;

        const matchesCode: boolean = course.code.startsWith(code.value.toUpperCase());
        const matchesTitle: boolean = course.title.toLowerCase().includes(title.value.toLowerCase());

        return matchesCode && matchesTitle;
    })
});

const table = useVueTable({
    get data() { return courses.value },
    columns,
    getCoreRowModel: getCoreRowModel()
});

</script>

<style>

</style>
