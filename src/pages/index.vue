<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    Index page
    <Button>
      <span class="i-line-md-hash mr-1" />
      Hello
    </Button>

    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>123</DialogTitle>
          <DialogDescription>321</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</template>
