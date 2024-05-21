<script setup lang="ts">
const state = reactive({
  url: '',
  title: null
})
const shortlink = ref()

async function onSubmit(event) {
  shortlink.value = null
  const response = await $fetch('/server/shortlinks', {
    method: 'POST',
    headers: [
      ['Content-Type', 'application/json'],
      ['Accept', 'application/json'],
    ],
    body: event.data
  })
  console.log(response)
  shortlink.value = response
}
</script>

<template>
  <div>
    <UCard class="mt-4">
      <h2 class="text-xl mb-5">make a shortlink now!</h2>
      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Page URL to shorten" name="url">
          <UInput type="url" v-model="state.url" required />
        </UFormGroup>
        <UFormGroup label="Page title (optional)" name="url">
          <UInput type="text" v-model="state.title" />
        </UFormGroup>
        <UButton type="submit" color="gray">
          Create
        </UButton>
      </UForm>
      <div v-if="shortlink" class="mt-4 text-center">
        <p class="mb-3">
          Your shortlink is here!
        </p>
        <UInput type="url" class="w-auto inline-block cursor-pointer" size="xl" aria-readonly="true" readonly
          :value="`https://aka.eojin.dev/${shortlink.code}`"
          @click="(e) => {e.target.focus(); e.target.select()}"></UInput>
      </div>
    </UCard>
  </div>
</template>