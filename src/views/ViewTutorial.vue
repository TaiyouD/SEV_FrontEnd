<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Tutorial View</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ tutorial.title }}
          <v-spacer></v-spacer>
          <!-- <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="mx-4"
          ></v-text-field> -->
          <v-btn class="mx-2" color="primary" @click="editTutorial()"
            >Edit</v-btn
          >
          <v-btn class="mx-2" color="success" @click="addLesson(id)"
            >Add Lesson</v-btn
          >
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="lessons"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-icon small class="mx-4" @click="editLesson(item)">
                mdi-pencil
              </v-icon>
              <v-icon small class="mx-4" @click="deleteLesson(item)">
                mdi-trash-can
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import TutorialServices from "../services/tutorialServices";
import LessonServices from "../services/lessonServices";

export default {
  name: "view-tutorial",
  props: ["id"],
  data() {
    return {
      search: "",
      tutorial: {},
      lessons: [],
      message: "Add, Edit or Delete Lessons",
      headers: [
        { text: "Title", value: "title" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.retrieveLessons();
  },
  methods: {
    retrieveLessons() {
      TutorialServices.get(this.id)
        .then((response) => {
          this.tutorial = response.data;
          LessonServices.getAllLessons(this.id)
            .then((response) => {
              this.lessons = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    editTutorial() {
      this.$router.push({ name: "edit", params: { id: this.id } });
    },
    editLesson(lesson) {
      this.$router.push({
        name: "editLesson",
        params: { tutorialId: this.id, lessonId: lesson.id },
      });
    },
    addLesson() {
      this.$router.push({ name: "addLesson", params: { tutorialId: this.id } });
    },
    deleteLesson(lesson) {
      LessonServices.deleteLesson(lesson.tutorialId, lesson.id)
        .then(() => {
          this.retrieveLessons();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "tutorials" });
    },
  },
};
</script>

<style></style>
