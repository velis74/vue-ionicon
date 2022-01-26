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
    <div style="color: blue">
      <IonIcon :name="icon"/>
      Icon should be blue here
    </div>
    <div style="color: red">
      <IonIcon :name="icon"/>
      Icon should be red here
    </div>
    <div style="color: darkgreen">
      <IonIcon :name="icon"/>
      Icon should be green here
    </div>
    <p>
      &hellip;
    </p>
    <p>
      Also note how - since all three icons above are the same - there's only one request to the icon repository for
      all.
    </p>
    <p>
      Icon, loaded from a custom url.<br>
      <IonIcon class="bigger" name="https://www.velis.si/static/images/logo_icon.svg"/>
    </p>
    <p>
      And finally, one with literal svg <small>(and with a crude, brute-force animation too)</small><br>
      <IonIcon class="bigger" :name="literalSvgAnimated"/>
    </p>
  </div>
</template>
<script>
import IonIcon from './ion-icon';

export default {
  name: 'DemoApp',
  components: { IonIcon },
  data() {
    return {
      icon: 'warning',
      literalSvg: `
<svg height="537.6" width="298" xmlns="http://www.w3.org/2000/svg" viewBox="0 -15 298 517.6">
  <defs>
    <symbol id="peco">
      <path d="M114.6 354.7c0 4.3-3.5 7.4-7.4 7.4H59c-3.8 0-7.4-3.1-7.4-7.4v-52.5a10 10 0 0 1 10.1-10.1h42.8
               a10 10 0 0 1 10 10.1v52.5z"/>
      <path d="M102.8 360.1H84.4v71c0 12.6 18.4 12.6 18.4 0v-71zM81.6 360.1H63.2v71c0 12.5 18.4 12.5 18.4 0v-71z"/>
      <path d="M83.3 287.8a13.8 13.8 0 1 0 0-27.6 13.8 13.8 0 0 0 0 27.6z"/>
    </symbol>
    <symbol id="d-puscica">
      <path d="M202.9 21.5c-.2-28.5 41-28.8 41.2 0l-.6 86.5L265.7 81C281 64 308 87.5 291.3 106.5l-53.8 64
               c-8.5 8.5-19.5 8.5-28 0L156 106.2c-16.7-19 10.5-42.7 25.6-25.6l22 27.4-.7-86.5z"/>
    </symbol>
    <symbol id="l-puscica">
      <path d="M53.1 155.6c-.2 28.5 41 28.8 41.3 0L93.8 69 116 96.2c15.3 16.8 42.2-6.6 25.6-25.6l-53.8-64
               c-8.5-8.6-19.6-8.5-28 0L6.2 70.8c-16.6 19 10.6 42.6 25.6 25.6l22-27.5-.7 86.6z"/>
    </symbol>
    <clipPath id="l-puscica-dol">
      <rect x="0" y="0" width="298" height="$y1"/>
    </clipPath>
    <clipPath id="d-puscica-gor">
      <rect x="0" y="$0" width="298" height="$y2"/>
    </clipPath>
  </defs>
  <g opacity=".81">
    <path d="M0 448V230a39.2 39.2 0 0 1 39.8-39.8h218.5A39.5 39.5 0 0 1 298 230v218a38.6 38.6 0 0 1-39.5 39.6H39.8
             A39.5 39.5 0 0 1 0 448z"/>
    <path d="M41.2 231.9h215.6v214.4H41.2V231.9z" fill="#fff"/>
    <use href="#l-puscica" y="$y2" clip-path="url(#l-puscica-dol)"/>
    <use href="#l-puscica" y="-$y1"/>
    <use href="#d-puscica" y="$y1" clip-path="url(#d-puscica-gor)"/>
    <use href="#d-puscica" y="-$y2"/>
    <use href="#peco"/>
    <use href="#peco" x="66"/>
    <use href="#peco" x="132"/>
  </g>
</svg>
      `,
      literalSvgOffset: 50,
    };
  },
  computed: {
    literalSvgAnimated() {
      return this.literalSvg
        .replace(/\$y1/g, this.literalSvgOffset)
        .replace(/\$y2/g, 187 - this.literalSvgOffset);
    },
  },
  mounted() {
    window.setInterval(() => { this.literalSvgOffset = (this.literalSvgOffset + 3) % 187; }, 10);
  },
};
</script>
<style>
.ionicon-wrapper {
  display: inline-block;
  height:  1.5em;
}

.ionicon-wrapper > svg {
  display: inline-block;
  height:  1.5em;
}

.ionicon-wrapper.bigger > svg {
  height: 5em;
}
</style>
