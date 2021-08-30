package it.innove;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.util.Log;
import com.facebook.react.bridge.*;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class LegacyScanManager extends ScanManager {

	public LegacyScanManager(ReactApplicationContext reactContext, BleManager bleManager) {
		super(reactContext, bleManager);
	}

	@Override
	public void stopScan(Callback callback) {
		// update scanSessionId to prevent stopping next scan by running timeout thread
		scanSessionId.incrementAndGet();

		getBluetoothAdapter().getBluetoothLeScanner().stopScan(mLeScanCallback);
		callback.invoke();
	}

	private ScanCallback mLeScanCallback =
			new ScanCallback() {

				@Override
				public void onScanResult(int callbackType, final ScanResult result) {
					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							Log.i(BleManager.LOG_TAG, "DiscoverPeripheral: " + result.getDevice().getName());

                            Peripheral peripheral = bleManager.getPeripheral(result.getDevice());
                            if (peripheral == null) {
                            	peripheral = new Peripheral(result.getDevice(), result.getRssi(), result.getScanRecord().getBytes(), bleManager.getReactContext());
							} else {
                            	peripheral.updateData(result.getScanRecord().getBytes());
                            	peripheral.updateRssi(result.getRssi());
							}
                            bleManager.savePeripheral(peripheral);

							WritableMap map = peripheral.asWritableMap();
							bleManager.sendEvent("BleManagerDiscoverPeripheral", map);
						}
					});
				}


			};

	@Override
	public void scan(ReadableArray serviceUUIDs, final int scanSeconds, ReadableMap options, Callback callback) {
		if (serviceUUIDs.size() > 0) {
			Log.d(BleManager.LOG_TAG, "Filter is not working in pre-lollipop devices");
		}
		getBluetoothAdapter().getBluetoothLeScanner().startScan(mLeScanCallback);

		if (scanSeconds > 0) {
			Thread thread = new Thread() {
				private int currentScanSession = scanSessionId.incrementAndGet();

				@Override
				public void run() {

					try {
						Thread.sleep(scanSeconds * 1000);
					} catch (InterruptedException ignored) {
					}

					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							BluetoothAdapter btAdapter = getBluetoothAdapter();
							// check current scan session was not stopped
							if (scanSessionId.intValue() == currentScanSession) {
								if (btAdapter.getState() == BluetoothAdapter.STATE_ON) {
									btAdapter.getBluetoothLeScanner().stopScan(mLeScanCallback);
								}
								WritableMap map = Arguments.createMap();
								bleManager.sendEvent("BleManagerStopScan", map);
							}
						}
					});

				}

			};
			thread.start();
		}
		callback.invoke();
	}
}
