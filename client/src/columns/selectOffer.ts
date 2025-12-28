import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { type IOffer } from '../../../server/utility/offer';

const columns: ColumnDef<IOffer>[] = [
    {
        accessorKey: "section",
        header: "Section"
    },
    {
        accessorKey: "dayOfWeek",
        header: "Day"
    },
    {
        accessorKey: "timeStart",
        header: "Start"
    },
    {
        accessorKey: "timeEnd",
        header: "End"
    },
];

export default columns;
