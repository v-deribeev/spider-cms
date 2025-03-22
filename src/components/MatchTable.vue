<template>
  <div class="flex column justify-center items-center">
    <CustomHeadings class="team-name text-uppercase text-bold" tag="h2" size="small">
      {{ teamName }}
    </CustomHeadings>
    <div class="table-base-style" :class="tableClass">
      <q-table
        v-bind="tableProps"
        :rows="extendedRows"
        :columns="columns"
        :loading="loading"
        :class="tableClass"
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
              :arias="$t('buttons.addYellowCard')"
              variant="card"
              customClass="bg-main-yellow"
              @click="addCard(props.row, 'yellow')"
            />
            <CommonButton
              :label="props.row?.cards?.red || '&nbsp;'"
              :arias="$t('buttons.addRedCard')"
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
            <span>{{ $t('match.error') }}</span>
          </div>
        </template>
      </q-table>
    </div>
    <div class="flex justify-between cards-text-container text-bold">
      <CustomLabels tag="p">{{
        $t('match.cards.yellow', { count: sumTotalCards?.yellow })
      }}</CustomLabels>
      <CustomLabels tag="p">{{
        $t('match.cards.red', { count: sumTotalCards?.red })
      }}</CustomLabels>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CommonButton from '@/components/CommonButton.vue'
import CustomHeadings from '@/components/CustomHeadings.vue'
import CustomLabels from '@/components/CustomLabels.vue'

const { t } = useI18n()

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

const tableProps = {
  rowKey: 'name',
  dense: true,
  flat: true,
  separator: 'none',
  hidePagination: true,
  rowsPerPageOptions: [0],
  noDataLabel: props.isError ? t('match.error') : t('match.noData'),
}

const columns = [
  {
    name: 'number',
    required: true,
    label: t('table.columns.number'),
    align: 'left',
    field: (row) => row.s_n,
  },
  {
    name: 'name',
    align: 'left',
    label: t('table.columns.name'),
    field: 'name',
  },
  {
    name: 'position',
    align: 'left',
    label: t('table.columns.position'),
    field: (row) => {
      const positions = {
        G: t('table.positions.G'),
        D: t('table.positions.D'),
        M: t('table.positions.M'),
        A: t('table.positions.A'),
      }
      return positions[row?.position] || '-'
    },
  },
  {
    name: 'actions',
    align: 'center',
    label: t('table.columns.cards'),
    field: 'actions',
  },
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

const teamName = computed(() => {
  const teamType = props.isAwayTeam ? 'awayTeam' : 'homeTeam'
  return t(`match.${teamType}`, { name: props.team?.name || t('common.tba') })
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
