<template>
  <div class="flex column justify-center items-center">
    <q-table
      :title="team?.name || 'TBA'"
      :rows="extendedRows"
      :columns="columns"
      row-key="name"
      dense
      :hide-pagination="true"
      :rows-per-page-options="[0]"
      :loading="loading"
      :class="{ 'away-team-style': isAwayTeam, 'home-team-style': !isAwayTeam }"
      class="table-base-style"
      style="min-height: 425px; width: 100%"
      :no-data-label="isError ? 'Failed to load data. Please try again.' : 'No players available'"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props" :class="nameCell(props.row)">
          {{ props.row.name }}
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <button class="yellow-card card q-mr-sm" @click="addCard(props.row, 'yellow')">
            {{ props.row?.cards?.yellow || '&nbsp;' }}
          </button>
          <button class="red-card card" @click="addCard(props.row, 'red')">
            {{ props.row?.cards?.red || '&nbsp;' }}
          </button>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:no-data>
        <div v-if="isError" class="full-width flex flex-center text-negative">
          <q-icon name="error_outline" size="24px" class="q-mr-sm" />
          <span>Failed to load data. Please try again.</span>
        </div>
      </template>
    </q-table>
    <div class="flex justify-between cards-text-container">
      <p>{{ sumTotalCards?.yellow || 0 }} yellow cards</p>
      <p>{{ sumTotalCards?.red || 0 }} red cards</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
const props = defineProps({
  team: {
    type: Object,
    required: true,
    default: () => ({ lineup: { start: [] }, name: '' }),
  },
  loading: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAwayTeam: {
    type: Boolean,
    required: false,
    default: false,
  },
  isError: {
    type: Boolean,
  },
})

const columns = [
  {
    name: 'number',
    required: true,
    label: 'No',
    align: 'left',
    field: (row) => row.s_n,
  },
  { name: 'name', align: 'left', label: 'Name', field: 'name' },
  {
    name: 'position',
    align: 'left',
    label: 'Position',
    field: (row) => row.position || 'PLAYER POSITION',
  },
  { name: 'actions', align: 'center', label: 'Cards', field: 'actions' },
]

const sumTotalCards = computed(() => {
  let totalYellow = 0
  let totalRed = 0

  extendedRows.value.forEach((player) => {
    totalYellow += player.cards.yellow
    totalRed += player.cards.red
  })

  return { yellow: totalYellow, red: totalRed }
})

const extendedRows = computed(() => {
  return (
    props.team?.lineup?.start?.map((player) => {
      return reactive({
        ...player,
        cards: { yellow: 0, red: 0 },
      })
    }) || []
  )
})

const nameCell = (row) => {
  if (row?.cards?.yellow === 1 && row?.cards?.red === 0) {
    return 'text-yellow'
  } else if (row?.cards?.red === 1) {
    return 'text-red'
  }
}

const addCard = (row, card) => {
  if (row.cards.yellow === 2 || row.cards.red > 0) return
  card === 'yellow' ? row.cards.yellow++ : row.cards.red++
  if (row.cards.yellow > 1) row.cards.red = 1
  console.log(`Editing row - '${row.name}', ${row.cards.red}, ${card}`)
}
</script>

<style scoped lang="scss">
.table-base-style {
  border: 2px solid $color--font--borders;
  border-radius: 8px;
  color: $color--font--borders;
}
.home-team-style {
  background-color: $bg--hometeam--table;
}
.away-team-style {
  background-color: $bg--awayteam--table;
}
.text-yellow {
  color: $color-yellow;
  font-weight: bold;
}
.text-red {
  color: $color-red;
  font-weight: bold;
}
.cards-text-container {
  min-width: 15rem;
  margin-top: 1rem;
}
.yellow-card {
  background-color: $color-yellow;
  border: none;
}
.red-card {
  background-color: $color-red;
}
.card {
  width: 32px;
  height: 24px;
  border-radius: 5px;
  border: none;
}
</style>
