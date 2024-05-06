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
  { key: 'date', label: '날짜', sortable: true },
  { key: 'id', label: '#' },
  { key: 'summary', label: '요약' }
];
const journal = [
  { id: 1, date: '2024-03-19', summary: '서론, devcontainer' }
];
</script>

<template>
  <Title>aka: a Bitly clone for personal NestJS + Nuxt study.</Title>
  <UContainer>
    <div class="w-full grid grid-cols-2">
      <div class="my-4">
        <div class="sticky">
          <h1 class="text-2xl font-bold"><a href="/">aka</a></h1>
          <p>: a Bitly clone for <a href="//yuptogun.com" target="_blank"
              class="underline underline-offset-4 text-gray-600 hover:text-gray-400">Eojin</a>'s personal <a
              href="//nestjs.com" target="_blank"
              class="underline underline-offset-4 text-gray-600 hover:text-gray-400">NestJS</a> + <a href="//nuxtjs.com"
              target="_blank" class="underline underline-offset-4 text-gray-600 hover:text-gray-500">Nuxt</a> study.</p>
          <ul class="text-sm text-gray-600 list-disc ms-3 my-3">
            <li>
              <a href="//github.com/yuptogun/aka" target="_blank" rel="noopener noreferrer"
                class="underline underline-offset-4 text-gray-400 hover:text-gray-600">Github Repo</a>
            </li>
            <li>
              Fonts: <a href="//github.com/RandomMaerks/Overused-Grotesk" target="_blank" rel="noopener noreferrer"
                class="underline underline-offset-4 text-gray-400 hover:text-gray-600">Overused Grotesk</a> + Noto Sans
              KR
            </li>
          </ul>
        </div>
      </div>
      <div class="my-5">
        <h2 class="text-lg font-bold">자습일지</h2>
        <UTable :rows="journal" :columns="columns" class="mb-3">
          <template #id-data="{ row }">
            {{ row.id }}일차
          </template>
          <template #date-data="{ row }">
            <span @click="getJournal(row.date)" class="underline underline-offset-4 cursor-pointer">{{ row.date }}</span>
          </template>
        </UTable>
        <UCard class="relative">
          <ContentRenderer :value="journalContent">
            <template #empty>
              <p>자습일지를 선택해서 읽으실 수 있습니다.</p>
            </template>
            <template #loading>
              loading...
            </template>
            <span class="absolute top-0 right-0 pt-3 pe-3 text-gray-400 hover:text-gray-600 cursor-pointer" @click="resetJournal()">닫기</span>
            <ContentRendererMarkdown :value="journalContent" class="prose" />
          </ContentRenderer>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
