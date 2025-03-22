import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
// import mockData from '../../mockData.json'
import { api } from '../boot/axios.js'

/**
 * Match data fetching composable
 *
 * Handles match-specific data fetching, including team lineups,
 * stadium information, and referee details.
 *
 * @example
 * ```js
 * const { matchData, loading, isError, fetchData } = useMatchData()
 * ```
 */
export function useMatchData() {
  const { t } = useI18n()
  const matchData = ref(null)
  const loading = ref(false)
  const isError = ref(false)

  const fetchData = async () => {
    // Reset states at the start of fetch
    isError.value = false
    loading.value = true

    try {
      const response = await api.get('/matches/view/basic/')
      matchData.value = response.data?.result
      // matchData.value = mockData.result
    } catch (err) {
      console.error('Error fetching data:', err)
      isError.value = true
      matchData.value = null // Clear data on error
    } finally {
      loading.value = false
    }
  }

  const stadiumName = computed(() => {
    return matchData.value?.[0]?.stadium.name || t('common.tba')
  })

  const refereeName = computed(() => {
    return matchData.value?.[0]?.referee.name || t('common.tba')
  })

  const homeTeam = computed(() => {
    return matchData.value?.[0]?.teamA || []
  })

  const awayTeam = computed(() => {
    return matchData.value?.[0]?.teamB || []
  })

  return {
    matchData,
    loading,
    isError,
    fetchData,
    stadiumName,
    refereeName,
    homeTeam,
    awayTeam,
  }
}
