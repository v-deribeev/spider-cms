<template>
  <q-page class="flex column flex-center">
    <div class="q-pa-md flex row justify-between q-gutter-xl">
      <TeamTable :loading :isError :team="homeTeam" />
      <TeamTable :loading :isError :team="awayTeam" :isAwayTeam="true" />
    </div>
    <p>Stadium: {{ matchData.result?.[0].stadium.name || 'TBA ' }}</p>
    <p>Referee: {{ matchData.result?.[0].referee.name || 'TBA' }}</p>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
// import mockData from '../../mockData.json'
import { api } from 'src/boot/axios.js'
import TeamTable from 'src/components/MatchTable.vue'

const matchData = reactive({})
const loading = ref(false)
const isError = ref(false)

const fetchData = async () => {
  isError.value = false
  try {
    loading.value = true
    const response = await api.get('/matches/view/basic/')
    Object.assign(matchData, response.data)
    // Object.assign(matchData, mockData)
    console.log('test2', matchData?.result?.[0])
  } catch (err) {
    console.error('Error fetching data:', err)
    isError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const homeTeam = computed(() => {
  return matchData.result?.[0].teamA
})
const awayTeam = computed(() => {
  return matchData.result?.[0].teamB
})
</script>

<style scoped lang="scss">
.text-yellow {
  color: #ffcb53;
}
.text-red {
  color: #f62650;
}
.cards-text-container {
  min-width: 15rem;
  margin-top: 1rem;
}
.yellow-card {
  background-color: #ffcb53;
  border: none;
}
.red-card {
  background-color: #f62650;
}
.card {
  line-height: 16px;
  width: 32px;
  height: 24px;
  border-radius: 5px;
  border: none;
}
</style>
