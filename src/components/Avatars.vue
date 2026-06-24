<template>
    <div class="main">
        <div class="toolbar">
            <input v-model="search" type="text" placeholder="Search blueprintId, name, tags..." />

            <span>
                {{ filteredAvatars.length.toLocaleString() }} avatars
            </span>
        </div>

        <DynamicScroller :items="rows" :min-item-size="300" key-field="rowIndex" class="scroller">
            <template #default="{ item, active }">
                <DynamicScrollerItem :item="item" :active="active" :data-index="item.blueprintId">
                    <div class="row">
                        <div v-for="avatar in item.items" :key="avatar.blueprintId" class="card"
                            @click="() => onAvatarClicked(avatar)">
                            <img :src="avatar.thumbnailURL" :alt="avatar.name" loading="lazy" />

                            <div class="name">
                                {{ avatar.name }}
                            </div>

                            <div class="id">
                                {{ avatar.blueprintId }}
                            </div>

                            <div class="tags">
                                <span class="tag" v-for="tag in avatar.tags">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>

        <AvatarDetailDialog v-model="showDialog" :avatar="dialogAvatar" class="detailDialog"></AvatarDetailDialog>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RecycleScroller, DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import AvatarDetailDialog from './AvatarDetailDialog.vue'

const props = defineProps({
    avatars: {
        type: Array,
        required: true
    }
})

const showDialog = ref(false);

const onAvatarClicked = (avatar) => {
    dialogAvatar.value = avatar;
    showDialog.value = true;
}

const dialogAvatar = ref({
    thumbnailURL: "",
    name: "",
    blueprintId: "",
    tags: [],
    critical: "",
    criticalShort: ""
})

const search = ref('')

const filteredAvatars = computed(() => {
    const q = search.value
        .trim()
        .toLowerCase()

    if (!q)
        return props.avatars

    const words = q
        .split(/\s+/)
        .filter(Boolean)

    return props.avatars.filter(item => {
        const text = item.searchText

        return words.every(word =>
            text.includes(word)
        )
    })
})

const rows = computed(() => {
    const result = []

    for (
        let i = 0;
        i < filteredAvatars.value.length;
        i += 5
    ) {
        result.push({
            rowIndex: i,
            items: filteredAvatars.value.slice(i, i + 6)
        })
    }

    return result
})
</script>

<style scoped>
.main {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.toolbar {
    padding: 12px;
    display: flex;
    gap: 12px;
    align-items: center;
}

.toolbar input {
    flex: 1;
    padding: 8px;
}

.scroller {
    flex: 1;
}

.row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    padding: 12px;
}

.card {
    border: 1px solid #444;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
    background-color: var(--bg);
}

.card:hover {
    cursor: pointer;
    transform: scale(1.1);
}

.card img {
    width: 100%;
    object-fit: cover;
    display: block;
}

.name {
    padding: 8px;
    font-weight: bold;
}

.id {
    padding: 0 8px;
    font-size: 12px;
    opacity: 0.7;
    word-break: break-all;
}

.tags {
    width: 100%;
    padding: 6px;
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