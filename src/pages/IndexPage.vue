<template>
  <q-page class="flex column flex-center">
    <div class="q-pa-md flex row justify-between q-gutter-x-xl">
      <TeamTable :loading :isError="isError || !matchData.result?.[0]" :team="homeTeam" />
      <TeamTable
        :loading
        :isError="isError || !matchData.result?.[0]"
        :team="awayTeam"
        :isAwayTeam="true"
      />
    </div>
    <div class="flex column flex-center text-uppercase text-bold">
      <CustomLabels tag="p">Stadium: {{ stadiumName }}</CustomLabels>
      <CustomLabels tag="p">Referee: {{ refereeName }}</CustomLabels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
// import mockData from '../../mockData.json'
import { api } from 'src/boot/axios.js'
import TeamTable from 'src/components/MatchTable.vue'
import CustomLabels from 'src/components/CustomLabels.vue'

const matchData = reactive({})
const loading = ref(false)
const isError = ref(false)

const fetchData = async () => {
  isError.value = false
  try {
    loading.value = true
    const response = await api.get('/matches/view/basic/')
    Object.assign(matchData, response.data)
    // Object.assign(matchData, mockData.result)
  } catch (err) {
    console.error('Error fetching data:', err)
    isError.value = true
  } finally {
    loading.value = false
  }
}

const stadiumName = computed(() => {
  return matchData.result?.[0]?.stadium.name || 'TBA'
})
const refereeName = computed(() => {
  return matchData.result?.[0]?.referee.name || 'TBA'
})

const homeTeam = computed(() => {
  return matchData.result?.[0]?.teamA || []
})
const awayTeam = computed(() => {
  return matchData.result?.[0]?.teamB || []
})

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.cards-text-container {
  min-width: 15rem;
  margin-top: 1rem;
}
</style>
