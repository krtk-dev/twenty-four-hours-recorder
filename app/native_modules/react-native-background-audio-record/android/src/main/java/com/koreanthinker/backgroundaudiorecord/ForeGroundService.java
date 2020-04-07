package com.koreanthinker.audiorecording;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;
import android.view.LayoutInflater;
import android.widget.Button;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

public class ForeGroundService extends Service {
    private static final String TAG = "MainActivity";

    public static final String CHANNEL_ID = "RecordingForegroundServiceChannel";
    public static RecordManager RM = null;

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // String input = intent.getStringExtra("inputExtra"); //props 개념
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, BackgroundAudioRecord.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0); // activity 유지
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID).setContentText("Save last 10 min")
                // .addAction(R.drawable.ic_launcher_foreground, "save",pendingIntent)
                // .addAction(R.drawable.ic_launcher_foreground, "other",pendingIntent)
                // .setSmallIcon(R.drawable.ic_launcher_background)
                .setContentIntent(pendingIntent).build();

        startForeground(1, notification);
        // 쓰레드 동작 시작
        RM = new RecordManager(this);
        // RM.onRecord();

        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "destory recording");
        RM.onStop();
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(CHANNEL_ID,
                    "Recording Foreground Service Channel", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }

    }
}
