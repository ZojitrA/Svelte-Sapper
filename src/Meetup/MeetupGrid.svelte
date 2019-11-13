<script>
import MeetupItem from "./MeetupItem.svelte";
export let meetups
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }


</style>


<section class="meetups">
  {#each meetups as meetup}
  <MeetupItem id={meetup.id} isFavorite={meetup.isFavorite} title={meetup.title} subtitle={meetup.subtitle} description={meetup.description} imageUrl={meetup.imageUrl} email={meetup.email} address={meetup.address} on:togglefavorite/>
  {/each}
</section>
