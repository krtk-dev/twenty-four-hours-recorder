package com.koreanthinker.audiorecording;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.content.Context;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class BackgroundAudioRecord {
    public void startService(Context context) {
        Intent serviceIntent = new Intent(context, ForeGroundService.class);
        serviceIntent.putExtra("inputExtra", "Foreground Service Example in Android");
        ContextCompat.startForegroundService(context, serviceIntent);
    }

    public void destoryService(Context context) {
        Intent serviceIntent = new Intent(context, ForeGroundService.class);
        stopService(serviceIntent);
    }

    public void startRecording() {
        ForeGroundService.RM.onRecord();
    }

    public void stopRecording() {
        ForeGroundService.RM.onStop();
    }

    public void playSound() {
        ForeGroundService.RM.onPlaySound();
    }

    public void stopSound() {
        ForeGroundService.RM.onStopSound();
    }

    public void saveRecording() {
        ForeGroundService.RM.onSave();
    }
}
