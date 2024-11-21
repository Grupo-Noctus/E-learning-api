<template>
    
  <v-form v-model="valid" @submit.prevent>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="title"
            :counter="50"
            :rules="titleRules"
            label="Title"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="description"
            :counter="200"
            :rules="descriptionRules"
            label="Description"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
            <v-file-input clearable label="Course Image"></v-file-input>
        </v-col>
      </v-row>
      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    title: '',
    description : '',
    titleRules: [
      value => {
        if (value) return true

        return 'Title is required.'
      },
      value => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
      },
    ],
    descriptionRules: [
        value => {
            if (value) return true

        return 'description is required.'
      },
      value => {
        if (value?.length <= 200) return true

        return 'description must be less than 10 characters.'
      },
    ]
  
  }),
}
</script>

<style scoped></style>
