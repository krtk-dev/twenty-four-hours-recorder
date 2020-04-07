package com.app;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.app.BackgroundAudioRecord.BackgroundAudioRecord;
import com.app.BackgroundAudioRecord.ForeGroundService;
import com.facebook.react.ReactActivity;

import androidx.core.content.ContextCompat;

public class MainActivity extends ReactActivity {

  private BackgroundAudioRecord mBackgroundAudioRecord;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
//    mBackgroundAudioRecord = new BackgroundAudioRecord();
    Log.d("ASDF", "onCreate");
//    mBackgroundAudioRecord.startService(getApplicationContext());
//    startService();
  }

  @Override
  protected String getMainComponentName() {
    return "app";
  }

  public void startService() {
    Intent serviceIntent = new Intent(this, ForeGroundService.class);
    serviceIntent.putExtra("inputExtra", "Foreground Service Example in Android");
    ContextCompat.startForegroundService(this, serviceIntent);
  }
}
