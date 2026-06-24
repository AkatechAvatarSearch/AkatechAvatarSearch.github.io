<script setup>
import Main from './components/Avatars.vue'
import Loading from './components/Loading.vue'
import { onMounted, ref } from 'vue';

const loading = ref(true);
const loadingProgress = ref(0);
const avatars = ref([]);

onMounted(async () => {
  avatars.value = await downloadJson(
    "https://raw.githubusercontent.com/arandomanonymoususer/avtr.vrc.edu.pl_avatar_list/refs/heads/main/avatars.json",
    loadingProgress
  );
  avatars.value = avatars.value.map(item => ({ ...item, thumbnailURL: "https://static-vtt.vrc.edu.pl/" + item.thumbnailURL, searchText: [item.blueprintId, item.name, ...(item.tags ?? [])].join(' ').toLowerCase() }));
  loading.value = false;
})

async function downloadJson(url, progressRef) {
  const response = await fetch(url)

  const total = Number(
    response.headers.get('Content-Length')
  )

  const reader = response.body.getReader()

  let received = 0
  const chunks = []

  while (true) {
    const { done, value } =
      await reader.read()

    if (done)
      break

    chunks.push(value)

    received += value.length

    progressRef.value =
      Math.round(received / total * 100)
  }

  const blob = new Blob(chunks)

  const text = await blob.text()

  return JSON.parse(text)
}
</script>

<template>
  <Loading v-if="loading" :progress="loadingProgress" />
  <Main v-else :avatars="avatars" />
</template>
