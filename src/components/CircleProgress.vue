<template>
    <svg class="-rotate-90" :width="radius * 2" :height="radius * 2">
        <circle
            class="text-white text-opacity-25"
            :stroke-width="stroke"
            stroke="currentColor"
            fill="transparent"
            :r="normalRadius()"
            :cx="radius"
            :cy="radius"
        />
        <circle
            class="text-white"
            :stroke-width="stroke"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="circumference - percent / 100 * circumference"
            stroke-linecap="round"
            stroke="currentColor"
            fill="transparent"
            :r="normalRadius()"
            :cx="radius"
            :cy="radius"
        />
    </svg>
</template>

<script lang="ts" setup>
    const props = defineProps({
        radius: {
            default: 24,
            type: Number
        },
        stroke: {
            default: 4,
            type: Number
        },
        percent: {
            default: 25,
            type: Number
        }
    })
    const circumference = (props.radius - props.stroke * 2) * 2 * Math.PI;

    const normalRadius = () => {
        return props.radius - props.stroke * 2;
    }
</script>