<template>
    <div class="my-enrol">
        <h2 class="my-enrol-header">My Enrolment</h2>
        <div class="my-10"></div>

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

        <TableBody>
            <!-- Data Exist-->
            <template v-if="table.getRowModel().rows?.length">
                <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
                    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </TableCell>
                </TableRow>
            </template>
            <!-- Data Does Not Exist-->
            <template v-else>
                <TableCell :colspan="columns.length" class="h-24 text-center">You did not enrol this semester.</TableCell>
            </template>
        </TableBody>
    </Table>
    </div>
</template>

<script setup lang="ts">
import { courseStore } from '../stores/stars';
import { enrolmentStore } from '../stores/profile';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import type { IEnrolment } from '../../../server/utility/enrolment';
import type { ICourse } from '../../../server/utility/course';
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable } from '@tanstack/vue-table';
import columns, { type EnrolDisplay } from '@/columns/myEnrol'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const enrolmentState = enrolmentStore();
const courseState = courseStore();

const displayedEnrolment = computed<EnrolDisplay[]>(() => {
    return enrolmentState.myEnrolment.map((enrol: IEnrolment) => {
        // Course that match the code
        const course: ICourse | undefined = courseState.allCourses.find((course: ICourse) => course.code === enrol.courseCode);

        let cleanedObject: EnrolDisplay;

        if (course) {
            const { title } = course;

            cleanedObject = {
                ...(enrol.toJSON()),
                title: title
            } as EnrolDisplay;
        } else {
            cleanedObject = enrol.toJSON() as EnrolDisplay;
        }

        return cleanedObject;
    });
});

const table = useVueTable({
    get data() { return displayedEnrolment.value },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
});

onMounted(async () => {
    await enrolmentState.getMyEnrolment();
});

onBeforeUnmount(() => {
    enrolmentState.myEnrolment = [];
});
</script>

<style>

</style>
