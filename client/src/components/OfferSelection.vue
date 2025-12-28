<template>
    <form class="offer" @submit.prevent="">
        <!-- For selecting the course that wish to add the index, and submit value -->
        <h2 class="offer-header">Select your course</h2>
        <div class="my-3"></div>
        <select class="text-lg border rounded-md" v-model="code" name="course" id="code">
            <option value="" default>Course</option>
            <option v-for="enrol in enrolDisplay" :key="enrol.courseCode" :value="enrol.courseCode">
                <p class="text-lg">{{ enrol.courseCode }} - {{ enrol.title }}</p>
            </option>
        </select>

        <!-- Given that course code is the must, provide all sections taught there-->
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
                <TableCell :colspan="columns.length" class="h-24 text-center">No offer for this course in this semester.</TableCell>
            </template>
        </TableBody>
    </Table>


        <button type="submit"></button>
    </form>
</template>

<script lang="ts" setup>
import { enrolmentStore } from '@/stores/profile';
import { courseStore, offerStore } from '@/stores/stars';
import { onBeforeUnmount, onMounted, ref, computed } from 'vue';
import type { ICourse } from '../../../server/utility/course';
import type { IEnrolment } from '../../../server/utility/enrolment';
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable } from '@tanstack/vue-table';
import columns from '@/columns/selectOffer.ts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// All subject that the student enrols (after confirmation).
// User select timetable -> offer.
// `code - title`

const enrolmentState = enrolmentStore();
const courseState = courseStore();
const offerState = offerStore()

interface enrolWithTitle extends IEnrolment {
    readonly title?: string;
}

const code = ref<string>(''); // Return all offers
const enrolDisplay = computed<enrolWithTitle[]>(() => {
    return enrolmentState.myEnrolment.map((enrol: IEnrolment) => {
        const title: string = courseState.allCourses.find((course: ICourse) => enrol.courseCode === course.code)?.title ?? "";
        return { title: title, ...enrol.toJSON()} as enrolWithTitle;
    } );
});



const table = useVueTable({
    get data() { return offerState.filterByCourse(code.value) },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
});

onMounted(async () => {
    enrolmentState.getMyEnrolment();
});

onBeforeUnmount(() => {
    enrolmentState.clearEnrolment();
})
</script>


<style scoped></style>
