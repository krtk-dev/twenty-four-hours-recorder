package com.koreanthinker.twentyfourhourrecorder.BackgroundAudioRecord;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class BackgroundAudioRecordModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private  RecordManager RM = null;

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
        mBackgroundAudioRecord = new BackgroundAudioRecord();
        Log.d("ASDF", "startService");
        mBackgroundAudioRecord.startService(reactContext);
    }

    @ReactMethod
    public void stopService() {
        mBackgroundAudioRecord.stopService(reactContext);
    }

    @ReactMethod
    public void saveRecording(int time, String name, Callback cb) {
        try {
            cb.invoke(mBackgroundAudioRecord.saveRecording(time, name, reactContext));
        } catch (NoSuchMethodException e) {
            cb.invoke("noService");
        }
    }
}
