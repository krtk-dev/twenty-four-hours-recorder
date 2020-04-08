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

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Log.d("ASDF", "onCreated");
  }

  @Override
  protected String getMainComponentName() {
    return "app";
  }
}
