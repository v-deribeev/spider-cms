<template>
  <q-page class="flex column flex-center">
    <div class="q-pa-md flex row justify-between q-gutter-x-xl">
      <TeamTable :loading="loading" :isError="isError" :team="homeTeam" />
      <TeamTable :loading="loading" :isError="isError" :team="awayTeam" :isAwayTeam="true" />
    </div>
    <div class="flex column flex-center text-uppercase text-bold">
      <CustomLabels tag="p">{{ $t('match.stadium', { name: stadiumName }) }}</CustomLabels>
      <CustomLabels tag="p">{{ $t('match.referee', { name: refereeName }) }}</CustomLabels>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import TeamTable from '@/components/MatchTable.vue'
import CustomLabels from '@/components/CustomLabels.vue'
import { useMatchData } from '@/composables/useMatchData'

const { loading, isError, fetchData, stadiumName, refereeName, homeTeam, awayTeam } = useMatchData()

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
