<template>
  <div class="flex column justify-center items-center">
    <CustomHeadings class="team-name text-uppercase text-bold" tag="h2" size="small">
      {{ teamName }}
    </CustomHeadings>
    <div class="table-base-style" :class="tableClass">
      <q-table
        :rows="extendedRows"
        :columns="columns"
        row-key="name"
        dense
        flat
        separator="none"
        :hide-pagination="true"
        :rows-per-page-options="[0]"
        :loading="loading"
        :class="tableClass"
        :no-data-label="
          isError ? 'Failed to load data. Please try again.' : 'No match information available'
        "
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props" :class="nameCell(props.row)">
            {{ props.row.name }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <CommonButton
              class="q-mr-sm"
              :label="props.row?.cards?.yellow || '&nbsp;'"
              arias="Add yellow card"
              variant="card"
              customClass="bg-main-yellow"
              @click="addCard(props.row, 'yellow')"
            />
            <CommonButton
              :label="props.row?.cards?.red || '&nbsp;'"
              arias="Add red card"
              variant="card"
              customClass="bg-main-red"
              @click="addCard(props.row, 'red')"
            />
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
    </div>
    <div class="flex justify-between cards-text-container text-bold">
      <CustomLabels tag="p">
        {{ sumTotalCards?.yellow }}
        <span class="main-yellow text-uppercase">yellow</span> cards
      </CustomLabels>
      <CustomLabels tag="p">
        {{ sumTotalCards?.red }}
        <span class="main-red text-uppercase">red</span> cards
      </CustomLabels>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CommonButton from 'src/components/CommonButton.vue'
import CustomHeadings from 'src/components/CustomHeadings.vue'
import CustomLabels from 'src/components/CustomLabels.vue'

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
    field: (row) => getPositionLabel(row?.position),
  },
  { name: 'actions', align: 'center', label: 'Cards', field: 'actions' },
]

// Highlights player's name text based on the card received
const nameCell = (row) => {
  if (row?.cards?.yellow === 1 && row?.cards?.red === 0) {
    return ['main-yellow', 'text-bold']
  } else if (row?.cards?.red === 1) {
    return ['main-red', 'text-bold']
  }
}

const addCard = (row, card) => {
  const { cards } = row
  if (cards.yellow === 2 || cards.red > 0) return
  card === 'yellow' ? cards.yellow++ : cards.red++
  if (cards.yellow > 1) cards.red = 1
}

const getPositionLabel = (position) => {
  const positionMap = {
    G: 'Goalkeeper',
    D: 'Defender',
    M: 'Midfielder',
    A: 'Attacker',
  }

  return positionMap[position] || '-'
}

const teamName = computed(() => {
  return props.isAwayTeam
    ? `away team ` + props.team?.name || 'TBA'
    : `home team ` + props.team?.name || 'TBA'
})

// Extends the team data object to include number of Y/R cards
const extendedRows = computed(() => {
  return (
    props.team?.lineup?.start?.map((player) => {
      player.cards = { yellow: 0, red: 0 }
      return player
    }) || []
  )
})

const sumTotalCards = computed(() => {
  if (!Array.isArray(extendedRows.value)) {
    return { yellow: 0, red: 0 }
  }
  return extendedRows.value.reduce(
    (totals, player) => {
      totals.yellow += player.cards?.yellow || 0
      totals.red += player.cards?.red || 0
      return totals
    },
    { yellow: 0, red: 0 },
  )
})

const tableClass = computed(() => {
  return {
    'bg-away': props.isAwayTeam,
    'bg-home': !props.isAwayTeam,
  }
})
</script>

<style scoped lang="scss">
.team-name {
  margin: 0.25rem;
}
:deep(th) {
  border-bottom: 1px solid;
}
.table-base-style {
  padding: 0.5rem;
  color: $color--font--borders;
  border: 2px solid;
  border-radius: 8px;
  min-height: 400px;
  width: 100%;
}
.cards-text-container {
  min-width: 15rem;
  margin-top: 1rem;
}
</style>
