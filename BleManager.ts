import React from 'react-native';
import { IBleManager, Peripheral, PeripheralInfo } from './index';

const bleManager = React.NativeModules.BleManager;

class BleManager implements IBleManager {
  constructor() {
    this.isPeripheralConnected = this.isPeripheralConnected.bind(this);
  }

  read(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise((fulfill, reject) => {
      bleManager.read(peripheralId, serviceUUID, characteristicUUID, (error, data) => {
        if (error) {
          reject(error);
        } else {
          fulfill(data);
        }
      });
    });
  }

  readRSSI(peripheralId) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.readRSSI(peripheralId, (error, rssi) => {
        if (error) {
          reject(error);
        } else {
          fulfill(rssi);
        }
      });
    });
  }

  refreshCache(peripheralId) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.refreshCache(peripheralId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          fulfill(result);
        }
      });
    });
  }

  retrieveServices(peripheralId, services?) {
    return new Promise<PeripheralInfo>((fulfill, reject) => {
      bleManager.retrieveServices(peripheralId, services, (error, peripheral) => {
        if (error) {
          reject(error);
        } else {
          fulfill(peripheral);
        }
      });
    });
  }

  write(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize?) {
    if (maxByteSize == null) {
      maxByteSize = 20;
    }
    return new Promise<void>((fulfill, reject) => {
      bleManager.write(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  writeWithoutResponse(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, queueSleepTime) {
    if (maxByteSize == null) {
      maxByteSize = 20;
    }
    if (queueSleepTime == null) {
      queueSleepTime = 10;
    }
    return new Promise<void>((fulfill, reject) => {
      bleManager.writeWithoutResponse(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, queueSleepTime, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  connect(peripheralId) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.connect(peripheralId, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  createBond(peripheralId, peripheralPin = null) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.createBond(peripheralId, peripheralPin, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  removeBond(peripheralId) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.removeBond(peripheralId, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  disconnect(peripheralId, force = true) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.disconnect(peripheralId, force, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  startNotification(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.startNotification(peripheralId, serviceUUID, characteristicUUID, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  startNotificationUseBuffer(peripheralId, serviceUUID, characteristicUUID, buffer) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.startNotificationUseBuffer(peripheralId, serviceUUID, characteristicUUID, buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  stopNotification(peripheralId, serviceUUID, characteristicUUID) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.stopNotification(peripheralId, serviceUUID, characteristicUUID, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  checkState() {
    bleManager.checkState();
  }

  start(options) {
    return new Promise<void>((fulfill, reject) => {
      if (options == null) {
        options = {};
      }
      bleManager.start(options, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  scan(serviceUUIDs, seconds, allowDuplicates, scanningOptions: any = {}) {
    return new Promise<void>((fulfill, reject) => {
      if (allowDuplicates == null) {
        allowDuplicates = false;
      }

      // (ANDROID) Match as many advertisement per filter as hw could allow
      // dependes on current capability and availability of the resources in hw.
      if (scanningOptions.numberOfMatches == null) {
        scanningOptions.numberOfMatches = 3;
      }

      // (ANDROID) Defaults to MATCH_MODE_AGGRESSIVE
      if (scanningOptions.matchMode == null) {
        scanningOptions.matchMode = 1;
      }

      // (ANDROID) Defaults to SCAN_MODE_LOW_POWER on android
      if (scanningOptions.scanMode == null) {
        scanningOptions.scanMode = 0;
      }

      if (scanningOptions.reportDelay == null) {
        scanningOptions.reportDelay = 0;
      }

      bleManager.scan(serviceUUIDs, seconds, allowDuplicates, scanningOptions, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  stopScan() {
    return new Promise<void>((fulfill, reject) => {
      bleManager.stopScan((error) => {
        if (error != null) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  enableBluetooth() {
    return new Promise<void>((fulfill, reject) => {
      bleManager.enableBluetooth((error) => {
        if (error != null) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  getConnectedPeripherals(serviceUUIDs) {
    return new Promise<Peripheral[]>((fulfill, reject) => {
      bleManager.getConnectedPeripherals(serviceUUIDs, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result != null) {
            fulfill(result);
          } else {
            fulfill([]);
          }
        }
      });
    });
  }

  getBondedPeripherals() {
    return new Promise<Peripheral[]>((fulfill, reject) => {
      bleManager.getBondedPeripherals((error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result != null) {
            fulfill(result);
          } else {
            fulfill([]);
          }
        }
      });
    });
  }

  getDiscoveredPeripherals() {
    return new Promise<Peripheral[]>((fulfill, reject) => {
      bleManager.getDiscoveredPeripherals((error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result != null) {
            fulfill(result);
          } else {
            fulfill([]);
          }
        }
      });
    });
  }

  removePeripheral(peripheralId) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.removePeripheral(peripheralId, (error) => {
        if (error) {
          reject(error);
        } else {
          fulfill(undefined);
        }
      });
    });
  }

  isPeripheralConnected(peripheralId, serviceUUIDs) {
    return this.getConnectedPeripherals(serviceUUIDs).then((result: any) => {
      if (
        result.find((p) => {
          return p.id === peripheralId;
        })
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  requestConnectionPriority(peripheralId, connectionPriority) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.requestConnectionPriority(peripheralId, connectionPriority, (error, status) => {
        if (error) {
          reject(error);
        } else {
          fulfill(status);
        }
      });
    });
  }

  requestMTU(peripheralId, mtu) {
    return new Promise<void>((fulfill, reject) => {
      bleManager.requestMTU(peripheralId, mtu, (error, mtu) => {
        if (error) {
          reject(error);
        } else {
          fulfill(mtu);
        }
      });
    });
  }
}
export default new BleManager();
