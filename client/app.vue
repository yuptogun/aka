<script>
const shortlinks = ref([]);
const f = await fetch('http://localhost:3001/api/shortlinks');
const j = await f.json();
shortlinks.value = j;
console.log(j);
</script>

<template>
  <Title>aka: a Bitly clone for personal NestJS + Nuxt study.</Title>
  <UContainer>
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 lg:items-start">
      <div class="py-4 lg:sticky lg:top-0">
        <Header></Header>
      </div>
      <Journal></Journal>
    </div>
    <Footer></Footer>
  </UContainer>
</template>
