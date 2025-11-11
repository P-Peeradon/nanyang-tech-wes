<template>
    <div
        class="flex flex-row items-center w-[200px] h-[100px] md:w-[300px] md:h-[150px] xl:w-[600px] xl:h-[300px] border-2 border-black rounded-md px-5"
    >
        <div class="w-1/2 flex justify-center">
            <img
                src="../assets/Profile_avatar_placeholder.png"
                alt="Profile_Image"
                class="w-10 h-10 md:w-20 md:h-20 xl:w-40 xl:h-40"
            />
        </div>
        <span class="h-4/5 w-0.5 xl:w-1 bg-indigo-900 inline-block"></span>
        <div class="w-1/2 flex flex-col indent-5 xl:space-y-3">
            <p class="text-xs md:text-sm xl:text-2xl font-semibold">{{ props.name }}</p>
            <p class="text-xs md:text-sm xl:text-2xl font-semibold">{{ props.program }}</p>
            <p class="text-xs md:text-sm xl:text-2xl font-semibold">{{ props.id }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface ProfileProp {
    name: string;
    program: string;
    id: string;
}

const props = defineProps<ProfileProp>();
</script>

<style></style>
