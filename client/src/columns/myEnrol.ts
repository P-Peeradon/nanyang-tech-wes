import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { enrolmentStore } from '@/stores/profile';
import axios from 'axios';

export interface EnrolDisplay {
    readonly studentId: string;
    readonly courseCode: string;
    // status: any;
    readonly year: number;
    readonly semester: number;
    readonly remark?: string;
    title?: string;
}

const dropCourse = async (code: string) => {
    const enrolmentState = enrolmentStore();

    try {
        const token = localStorage.getItem('authToken');
        const id = localStorage.getItem('studentId');

        console.log("Before:", enrolmentState.myEnrolment.length);

        await axios.delete(`${import.meta.env.VITE_API_URL}/api/enrolment/${id}/${code}`, {
            withCredentials: true, headers: {
                authorization: `Bearer ${token}`
            }
        });

        enrolmentState.removeEnrolment(code);

    } catch (err) {
        console.error(err);
    }
};

const columns: ColumnDef<EnrolDisplay>[] = [
    {
        accessorKey: "courseCode",
        header: "Course Code"
    },
    {
        accessorKey: "title",
        header: "Course Title"
    },
    {
        accessorKey: "remark",
        header: "Remark"
    },
    {
        id: "drop-action",
        header: "",
        cell: ({ row }) => h('button', {
            class: 'danger-button',
            onClick: (e: Event) => {
                e.stopPropagation();
                dropCourse(row.original.courseCode);
            }
        }, 'Drop')
    }
];

export default columns;
