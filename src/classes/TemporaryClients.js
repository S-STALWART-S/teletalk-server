const { stateManager } = require("@/classes/StateManager");

const {
  isDataHasEqualityWithTargetCellphone,
} = require("@/functions/utilities/utils");

class TemporaryClients {
  async addClient(client) {
    const aliveClients = this.getAliveClients();

    aliveClients.push(client);

    this.setAliveClients(aliveClients);
  }

  async setAliveClients(aliveClients) {
    const { temporaryClients } = stateManager.state;

    const newTemporaryClients = {
      ...temporaryClients,
      aliveClients,
    };

    const { temporaryClients: stateKey } = stateManager.stateKeys;
    await stateManager.setState(stateKey, newTemporaryClients);
  }

  getAliveClients() {
    return stateManager.state.temporaryClients.aliveClients;
  }

  findClient(tempoClientCellphone) {
    const aliveClients = this.getAliveClients();

    return aliveClients.find(
      (aliveClient) =>
        !!isDataHasEqualityWithTargetCellphone(
          aliveClient,
          tempoClientCellphone
        )
    );
  }

  findClientIndex(client) {
    const aliveClients = this.getAliveClients();

    return aliveClients.findIndex(
      (aliveClient) =>
        !!isDataHasEqualityWithTargetCellphone(aliveClient, client)
    );
  }

  async updateClient(client, updateProps) {
    const aliveClients = this.getAliveClients();
    const aliveClientIndex = this.findClientIndex(client);

    if (aliveClientIndex !== -1) {
      const aliveClient = aliveClients[aliveClientIndex];

      aliveClients.splice(aliveClientIndex, 1, {
        ...aliveClient,
        ...updateProps,
      });

      await this.setAliveClients(aliveClients);

      return { done: true };
    }

    return { done: false };
  }
}

const temporaryClients = new TemporaryClients();

module.exports = { temporaryClients, TemporaryClients };
