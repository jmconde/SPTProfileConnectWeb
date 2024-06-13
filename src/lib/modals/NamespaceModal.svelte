<script>
  import { Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "@sveltestrap/sveltestrap";
  import { createEventDispatcher } from "svelte";
  import { MultiSelect } from "svelte-multiselect";

  export let users = [];
  export let isOpen = false;
  export let namespace = {};

  let name = '';
  let description = '';
  let selectedUsers = [];

  console.log('name :>> ', name);
    
  const dispatchEvent = createEventDispatcher();  

  async function save() {
    dispatchEvent("save");
  } 
 
  function closeModal() {
    isOpen = false;
    name = '';
    description = '';
    dispatchEvent("close");
  }

  function updateName(params) {
    name = params.target.value;
    dispatchEvent("namespaceChange", {name});
  }

  function updateDescription(params) {
    console.log('name, description, selectedUsers :>> ', name, description, selectedUsers);
    description = params.target.value;
    dispatchEvent("namespaceChange", {description});
  }
  
  function updateUsers(event) {
    dispatchEvent("namespaceChange", {users: namespace.users});
  }
</script>

<Modal {isOpen}>
  <ModalHeader toggle={closeModal}>Namespace</ModalHeader>
  <ModalBody>
    <p>Namespace</p>
    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Namespace name</label>
        <input bind:value={namespace.name} type="text" class="form-control" id="name" name="name" on:input={updateName}>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Namespace description</label>
        <input bind:value={namespace.description} type="text" class="form-control" id="description" name="description"  on:input={updateDescription} >
      </div>
    </form>
    <!-- <FormGroup floating label="Namespace name">
      <Input bind:value={name} type="text" name="name" id="name" placeholder="with a placeholder"  />
    </FormGroup> -->
    <!-- <FormGroup floating label="Namespace description">
      <Input bind:value={description} type="text" name="description" id="description" placeholder="with a placeholder" />
    </FormGroup>{users.length} -->
    <MultiSelect
      placeholder="Select users..."
      bind:selected={namespace.users} options={users} 
      on:change={updateUsers}
      on:removeAll={() => namespace.users = []}
      let:option>
      {option.username}
    </MultiSelect>
  </ModalBody>
  <ModalFooter>
    <Button color="light" on:click={closeModal}>Cancel</Button>
    <Button color="primary" on:click={save}>Save</Button>
  </ModalFooter>
</Modal>

