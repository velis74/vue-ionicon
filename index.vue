<template>
  <div>
    <p>
      This small demo shows how the component works
    </p>
    <p>
      Icon to load:
      <select v-model="icon">
        <option selected>warning</option>
        <option>chatbox-ellipses-outline</option>
        <option>cog-outline</option>
        <option>construct-outline</option>
        <option>desktop-outline</option>
        <option>pulse-outline</option>
      </select>
      <br>
      <small>
        (just a few, for example)
      </small>
    </p>
    <div style="color: blue"><IonIcon :name="icon"/>Icon should be blue here</div>
    <div style="color: red"><IonIcon :name="icon"/>Icon should be red here</div>
    <div style="color: darkgreen"><IonIcon :name="icon"/>Icon should be green here</div>
    <p>
      &hellip;
    </p>
    <p>
      Also note how - since all three icons above are the same - there's only one request to the icon repository for
      all.
    </p>
  </div>
</template>
<script>
import IonIcon from './ion-icon';

export default {
  name: 'DemoApp',
  components: { IonIcon },
  data() {
    return { icon: 'warning' };
  },
};
</script>
