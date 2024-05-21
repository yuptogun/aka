<template>
  <Title>aka: a Bitly clone for personal NestJS + Nuxt study.</Title>
  <UContainer>
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-5">
      <div class="py-4 lg:sticky lg:top-0">
        <Header></Header>
        <Shortlink class="py-4"></Shortlink>
      </div>
      <Journal></Journal>
    </div>
    <Footer></Footer>
  </UContainer>
</template>
