package com.app.BackgroundAudioRecord;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class BackgroundAudioRecordModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private BackgroundAudioRecord mBackgroundAudioRecord = null;

    public BackgroundAudioRecordModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "BackgroundAudioRecord";
    }

    @ReactMethod
    public void startService() {
        // if (mBackgroundAudioRecord != null) {
        // return;
        // }
        mBackgroundAudioRecord = new BackgroundAudioRecord();
        Log.d("ASDF", "startService");
        mBackgroundAudioRecord.startService(reactContext);
    }

    @ReactMethod
    public void stopService() {
        mBackgroundAudioRecord.stopService(reactContext);
    }

    @ReactMethod
    public void startRecording() {
        mBackgroundAudioRecord.startRecording();
    }

    @ReactMethod
    public void stopRecording() {
        mBackgroundAudioRecord.stopRecording();
    }

    @ReactMethod
    public void saveRecording() {
        mBackgroundAudioRecord.saveRecording();
    }
}
