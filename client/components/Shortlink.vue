<script setup lang="ts">
const stateInitial = {
  url: '',
  title: null,
  id: null
}
const state = reactive({ ...stateInitial })
const shortlink = ref()

async function onSubmit(event) {
  shortlink.value = null
  await fetch('/server/shortlinks', {
    method: 'POST',
    headers: [
      ['Content-Type', 'application/json'],
      ['Accept', 'application/json'],
    ],
    body: JSON.stringify(event.data)
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    shortlink.value = await res.json()
    Object.assign(state, shortlink.value)
  }).catch((e: Error) => {
    alert(e.message)
  })
}

async function onDelete() {
  if (!state.id) {
    alert('you can delete only what you just created!')
    return
  }
  if (!confirm('you sure?')) {
    return
  }
  await fetch(`/server/shortlinks/${state.id}`, {
    method: 'DELETE'
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    shortlink.value = null
    Object.assign(state, stateInitial)
  }).catch((e: Error) => {
    alert(e.message)
  })
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
        <UButton type="submit" color="primary">
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
        <p>
          <UButton type="button" color="red" @click="onDelete">Delete</UButton>
        </p>
      </div>
    </UCard>
  </div>
</template>