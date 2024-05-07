<script setup lang="ts">
const journalContent = ref(null);
const getJournal = async function (date: string) {
  const data = await queryContent(`journal/${date}`).findOne();
  journalContent.value = data;
};
const resetJournal = () => {
  journalContent.value = null;
};

const columns = [
  { key: 'id', label: '제목', class: 'hidden md:table-cell' },
  { key: 'date', label: '날짜' },
  { key: 'summary', label: '요약' }
];
const journal = [
  { id: 11, date: '2024-04-26', summary: '단축링크 리디렉션 구현' },
  { id: 10, date: '2024-04-21', summary: 'Update 구현' },
  { id:  9, date: '2024-04-19', summary: 'Delete 구현' },
  { id:  8, date: '2024-04-17', summary: '테이블 컬럼 추가' },
  { id:  7, date: '2024-04-15', summary: 'Create 개선' },
  { id:  6, date: '2024-04-12', summary: 'Create 구현' },
  { id:  5, date: '2024-04-09', summary: 'PostgreSQL App에서 사용' },
  { id:  4, date: '2024-04-08', summary: 'PostgreSQL DataSource, 마이그레이션' },
  { id:  3, date: '2024-04-02', summary: 'PostgreSQL devcontainer, 의존성 설치' },
  { id:  2, date: '2024-04-01', summary: 'devcontainer 개선' },
  { id:  1, date: '2024-03-19', summary: '서론, devcontainer 시작' },
].map((j) => {
  j.id = { value: j.id, class: 'hidden md:table-cell' };
  return j;
});
const journalPage = ref(1);
const journalPageCount = 3;
const journalRows = computed(() => {
  let page = journalPage.value;
  return journal.slice((page - 1) * journalPageCount, page * journalPageCount)
})
</script>

<template>
  <div class="my-5">
    <h2 class="text-lg font-bold">자습일지</h2>
    <UTable :rows="journalRows" :columns="columns" class="mb-3">
      <template #id-data="{ row }">
        {{ row.id.value }}일차
      </template>
      <template #date-data="{ row }">
        <span @click="getJournal(row.date)" class="underline underline-offset-4 cursor-pointer">{{ row.date
          }}</span>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="journalPage" :page-count="journalPageCount" :total="journal.length" />
    </div>
    <UCard class="relative" v-if="journalContent">
      <ContentRenderer :value="journalContent">
        <template #empty>
          <p>자습일지를 선택해서 읽으실 수 있습니다.</p>
        </template>
        <span class="absolute top-0 right-0 pt-3 pe-3 text-gray-400 hover:text-gray-600 cursor-pointer"
          @click="resetJournal()">닫기</span>
        <ContentRendererMarkdown :value="journalContent" class="prose max-w-none">loading...</ContentRendererMarkdown>
      </ContentRenderer>
    </UCard>
  </div>
</template>