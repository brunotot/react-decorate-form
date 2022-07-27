const CREATE_UPDATE_DIALOG_CSS: string = /*css*/ `
  .ia-dialog-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin-bottom: 1.5rem;
    align-items: center;
    gap: 0.5rem;
  }
  .ia-dialog-header > div > h1 {
    margin-bottom: 0;
  }
  .ia-dialog-form {
    margin-bottom: 1.5rem;
  }
`;

const ROW_ACTIONS_CONTAINER_CSS: string = /*css*/ `
  .ia-form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-bottom: 0.125rem
  }

  @media screen and (max-width: 500px) {
    .ia-form-actions {
      flex-direction: column;
    }

    .ia-form-actions button {
      margin: 0;
      width: 100%;
    }
  }
`;

export { CREATE_UPDATE_DIALOG_CSS, ROW_ACTIONS_CONTAINER_CSS };
