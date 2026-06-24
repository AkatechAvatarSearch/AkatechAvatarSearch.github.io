<template>
    <Teleport to="body">
        <div v-if="modelValue" class="dialog-mask" @click="close">
            <div class="dialog-content" @click.stop>
                <div class="top">
                    <div class="image">
                        <img :src="avatar.thumbnailURL" :alt="avatar.name" loading="lazy" />
                    </div>
                    <div class="details">
                        <h2 class="name">
                            {{ avatar.name }}
                        </h2>

                        <div class="id">
                            {{ avatar.blueprintId }}
                        </div>

                        <div class="tags">
                            <span class="tag" v-for="tag in avatar.tags">{{ tag }}</span>
                        </div>
                    </div>
                </div>

                <hr />

                <h2>Criticals</h2>
                <h3>Long</h3>
                <p>{{ avatar.critical }}</p>
                <h3>Short</h3>
                <p>{{ avatar.criticalShort }}</p>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    avatar: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    'update:modelValue'
])

function close() {
    emit('update:modelValue', false)
}

function onKeyDown(e) {
    if (
        props.modelValue &&
        e.key === 'Escape'
    ) {
        close()
    }
}

onMounted(() => {
    window.addEventListener(
        'keydown',
        onKeyDown
    )
})

onUnmounted(() => {
    window.removeEventListener(
        'keydown',
        onKeyDown
    )
})
</script>

<style scoped>
.dialog-mask {
    position: fixed;
    inset: 0;

    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;
    backdrop-filter: blur(6px);
}

.dialog-content {
    max-width: 75vw;
    max-height: 75vh;

    overflow: auto;

    background: #1b1b1b;
    border-radius: 8px;

    padding: 24px;
}

.top {
    display: flex;
}

.image {
    width: 256px;
    height: 192px;
    flex-shrink: 0;
    margin-right: 16px;
}

.image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

h2 {
    font-weight: bold;
}

.id {
    font-size: 12px;
    opacity: 0.7;
    word-break: break-all;
}

.tags {
    width: 100%;
    padding: 6px 0;
    font-size: 12px;
}

.tag {
    display: inline-block;
    padding: 0 4px;
    border: #4cc048 1px solid;
    box-sizing: border-box;
    background: #4cc04880;
    color: #d0d8d0;
    margin-bottom: 4px;
    border-radius: 6px;
}

.tag:not(:last-child) {
    margin-right: 4px;
}
</style>
