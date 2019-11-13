<script>

export let cType = null
export let id
export let label
export let rows = null
export let value
export let type = "text"
export let validity = true
</script>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }

  .invalid {
    background: rgba(207, 0, 86, 0.4);
  }
  .error-message{
    color: red;
    font-size: 14px
  }
</style>

<div class="form-control">
  <label for="{id}">{label}</label>

  {#if cType === "textarea"}
  <textarea class:invalid="{!validity}" rows="{rows}" id="{id}" value={value} on:input/>
  {:else}
  <input class:invalid="{!validity}" type="{type}" id="{id}" value={value} on:input />
  {/if}
  {#if !validity}
  <p class="error-message">Please enter valid {label}</p>
  {/if}
</div>
