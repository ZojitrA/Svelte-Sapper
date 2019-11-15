<script>
  import Button from '../UI/Button.svelte'
  import {Meetups} from '../stores/meetups.js'
  import {createEventDispatcher, onDestroy} from 'svelte'
  import {fade, fly} from 'svelte/transition'
  export let id

  let dispatch = createEventDispatcher()
  let myMeetup = {}

  let unsubscribe = Meetups.subscribe( items => {
    myMeetup = items.find(item => item.id === id)
  })

  onDestroy(() => unsubscribe())

</script>

<style>
  section {
    margin-top: 4rem;
  }

  .image {
    width: 100%;
    height: 25rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image {
    background: #e7e7e7;
  }

  .content {
    text-align: center;
    width: 80%;
    margin: auto;
  }

  h1 {
    font-size: 2rem;
    font-family: 'Roboto Slab', sans-serif;
    margin: 0.5rem 0;
  }

  h2 {
    font-size: 1.25rem;
    color: #6b6b6b;
  }

  p {
    font-size: 1.5rem;
  }


</style>

  <section in:fade={{duration:1200}} out:fly={{x:0, y:-500}}>
    <div class="image">
      <img src="{myMeetup.imageUrl}" alt="">
    </div>
    <div class="content">
      <h1>{myMeetup.title}</h1>
      <h2>{myMeetup.subtitle}</h2>
      <p>{myMeetup.description}</p>
      <Button ref="mailto:{myMeetup.email}" caption="{myMeetup.email}"/>
      <Button type="button" on:click={() => dispatch("close")} caption="Close"/>

    </div>
  </section>
