<script setup lang="ts">
import type { AcceptableValue } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit, useVModel } from "@vueuse/core"
import { ChevronDownIcon } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ modelValue?: AcceptableValue | AcceptableValue[], class?: HTMLAttributes["class"] }>()

const emit = defineEmits<{
  "update:modelValue": AcceptableValue
}>()

const modelValue = useVModel(props, "modelValue", emit, {
  passive: true,
  defaultValue: "",
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <div
    class="group/native-select relative w-fit has-[select:disabled]:opacity-50"
    data-slot="native-select-wrapper"
  >
    <select
      v-bind="{ ...$attrs, ...delegatedProps }"
      v-model="modelValue"
      data-slot="native-select"
      :class="cn(
        'border-neutral-200 placeholder:text-neutral-500 selection:bg-neutral-900 selection:text-neutral-50 dark:bg-neutral-200/30 dark:hover:bg-neutral-200/50 h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:selection:bg-neutral-50 dark:selection:text-neutral-900 dark:dark:bg-neutral-800/30 dark:dark:hover:bg-neutral-800/50',
        'focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring-[3px] dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50',
        'aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900',
        props.class,
      )"
    >
      <slot />
    </select>
    <ChevronDownIcon
      class=text-neutral-500 pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none dark:text-neutral-400
      aria-hidden="true"
      data-slot="native-select-icon"
    />
  </div>
</template>
