<template>
  <div :id="placement">
    <div v-for="(app, index) in apps" :key="index">
      <component
        v-if="app.loaded"
        :is="'style'"
        v-html="app.loaded.css"
      ></component>
      <div v-if="app.loaded" v-html="app.loaded.html"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: { placement: String },
  data() {
    return {
      apps: []
    };
  },
  mounted() {
    this.loadApps();
  },
  methods: {
    async loadApps() {
      const apps = this.$store.state.apps.results.filter(a=>a.placement==this.placement);
      if (apps.length > 0) {
        for (let index = 0; index < apps.length; index++) {
          const app = apps[index];
          if (!app.loaded) {
            try {
              const response = await this.$http.get(`https://appstatic.storeino.com/${app.route}/store`);
              let { manifest, html, css, js } = response.data;
              const uid = `${Date.now()}${Math.floor(Math.random() * 100)}`;
              js = js.replace("__DATA__", JSON.stringify(app.config).replace(/\"/g, '"'));
              html = html.replace(new RegExp(`app_${app.route}`, "g"),`app_${app.route}_${uid}`);
              css = css.replace(new RegExp(`#app_${app.route}`, "g"),`#app_${app.route}_${uid}`);
              js = js.replace(new RegExp(`app_${app.route}`, "g"),`app_${app.route}_${uid}`);
              app.loaded = { manifest, html, css, js };
              const appIndex = this.$store.state.apps.findIndex(a => a._id == app._id);
              if (appIndex >= 0) this.$store.state.apps[appIndex] = app;
              this.apps.push(app);
            } catch (error) {
            }
          } else {
            this.apps.push(app);
          }
        }
      }
      this.$nextTick(() => {
        if (this.apps.length > 0) {
          for (let index = 0; index < this.apps.length; index++) {
            const app = this.apps[index];
            try {
              eval(app.loaded.js);
            } catch (error) {
              console.log("Error Loading App", error);
            }
          }
        }
      });
    }
  }
};
</script>
