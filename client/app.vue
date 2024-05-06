<script setup lang="ts">
import * as fs from 'node:fs';
import MarkDownIt from 'markdown-it';

onMounted(() => {
  let githubButtonScript = document.createElement('script');
  githubButtonScript.setAttribute('src', 'https://buttons.github.io/buttons.js');
  document.head.appendChild(githubButtonScript);
});

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
  { id: 9, date: '2024-04-19', summary: 'Delete 구현' },
  { id: 8, date: '2024-04-17', summary: '테이블 컬럼 추가' },
  { id: 7, date: '2024-04-15', summary: 'Create 개선' },
  { id: 6, date: '2024-04-12', summary: 'Create 구현' },
  { id: 5, date: '2024-04-09', summary: 'PostgreSQL App에서 사용' },
  { id: 4, date: '2024-04-08', summary: 'PostgreSQL DataSource, 마이그레이션' },
  { id: 3, date: '2024-04-02', summary: 'PostgreSQL devcontainer, 의존성 설치' },
  { id: 2, date: '2024-04-01', summary: 'devcontainer 개선' },
  { id: 1, date: '2024-03-19', summary: '서론, devcontainer 시작' },
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
  <Title>aka: a Bitly clone for personal NestJS + Nuxt study.</Title>
  <UContainer>
    <div class="w-full grid grid-cols-1 lg:grid-cols-2">
      <div class="my-4">
        <div class="sticky">
          <h1 class="text-2xl font-bold"><a href="/">aka</a></h1>
          <p>: a <a href="//bitly.com" target="_blank"
              class="underline underline-offset-4 text-gray-600 hover:text-gray-400">Bitly</a> clone for <a
              href="//yuptogun.com" target="_blank"
              class="underline underline-offset-4 text-gray-600 hover:text-gray-400">Eojin</a>'s personal <a
              href="//nestjs.com" target="_blank"
              class="underline underline-offset-4 text-gray-600 hover:text-gray-400">NestJS</a> + <a href="//nuxtjs.com"
              target="_blank" class="underline underline-offset-4 text-gray-600 hover:text-gray-500">Nuxt</a> study.</p>
        </div>
      </div>
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
        <UCard class="relative">
          <ContentRenderer :value="journalContent">
            <template #empty>
              <p>자습일지를 선택해서 읽으실 수 있습니다.</p>
            </template>
            <span class="absolute top-0 right-0 pt-3 pe-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              @click="resetJournal()">닫기</span>
            <ContentRendererMarkdown :value="journalContent" class="prose">loading...</ContentRendererMarkdown>
          </ContentRenderer>
        </UCard>
      </div>
    </div>
    <footer class="pb-5 text-center">
      <ul class="text-sm text-gray-600 list-none py-5">
        <li class="inline">
          <a href="//github.com/yuptogun/aka" target="_blank" rel="noopener noreferrer"
            class="underline underline-offset-4 text-gray-400 hover:text-gray-600">2024~</a> by yuptogun
        </li> &dot; 
        <li class="inline">
          <a href="//github.com/RandomMaerks/Overused-Grotesk" target="_blank" rel="noopener noreferrer"
            class="underline underline-offset-4 text-gray-400 hover:text-gray-600">Overused Grotesk</a> by RandomMaerks
        </li>
      </ul>
    </footer>
  </UContainer>
</template>
