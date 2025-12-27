import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { type ICourse } from '../../../server/utility/course';
import { Enrolment } from '../../../server/utility/enrolment';
import { enrolmentStore } from '@/stores/profile';
import axios from 'axios';

const enrolInCourse = async (code: string) => {
    const enrolmentState = enrolmentStore();

    const NTUid = localStorage.getItem('studentId');
    const token = localStorage.getItem('authToken');

    // Use API to create enrolment.
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/enrolment`, {
            studentId: NTUid,
            courseCode: code,
        },{
            withCredentials: true, headers: {
                authorization: `Bearer ${token}`
            }
        });

        const { data } = response;

        enrolmentState.addEnrolment(new Enrolment(data.studentId, data.courseCode, data.year, data.semester));

    } catch (err) {
        console.error(err);
    }
}

const columns: ColumnDef<ICourse>[] = [
    {
        accessorKey: "code",
        header: "Course Code"
    },
    {
        accessorKey: "title",
        header: "Course Title"
    },
    {
        accessorKey: "au",
        header: "AUs",
        cell: ({ row }) => {
            return parseInt(row.getValue("au"))
        }
    },
    {
        id: "enrol-action",
        header: "",
        cell: ({ row }) => h('button', {
            class: 'primary-button',
            onClick: (e: Event) => {
                e.preventDefault();
                enrolInCourse(row.original.code);
            }
        }, 'Enrol')
    }
];

export default columns;
