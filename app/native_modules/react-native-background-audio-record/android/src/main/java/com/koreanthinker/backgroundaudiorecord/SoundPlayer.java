package com.koreanthinker.audiorecording;

import android.content.Context;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.media.MediaPlayer;
import android.util.Log;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class SoundPlayer {

    private static final String TAG = "MainActivity";

    private Thread mPlayThread;
    private boolean isPlaying = false;
    private int mBufferSize;
    private String mFilePath;
    private AudioTrack mAudioTrack;

    private Context context;

    public SoundPlayer() {

    }

    private void SoundProcess() {
        Log.d(TAG, "" + mBufferSize);
        Log.d(TAG, mFilePath);
        byte[] writeData = new byte[mBufferSize];
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(mFilePath);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        DataInputStream dis = new DataInputStream(fis);
        mAudioTrack.play();  // write 하기 전에 play 를 먼저 수행해 주어야 함
        while (isPlaying) {
            try {
                int ret = dis.read(writeData, 0, mBufferSize);
                Log.d(TAG, "" + ret);
                if (ret <= 0) {
                    break;
                }
                mAudioTrack.write(writeData, 0, ret); // AudioTrack 에 write 를 하면 스피커로 송출됨
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        mAudioTrack.stop();
        mAudioTrack.release();
        mAudioTrack = null;

        try {
            dis.close();
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Log.d(TAG, "SoundTreadDie");
    }

    public void Play(String filePath, int bufferSize, int sampleRate, int channelCount, int audioFormat) {
        isPlaying = true;
        Log.d(TAG,filePath);
        mFilePath = filePath;
        mBufferSize = bufferSize;
        mAudioTrack = new AudioTrack(AudioManager.STREAM_MUSIC, sampleRate, channelCount, audioFormat, bufferSize, AudioTrack.MODE_STREAM); // AudioTrack 생성
        mPlayThread = new Thread(new Runnable() {
            @Override
            public void run() {
                SoundProcess();
            }
        });
        mPlayThread.start();
    }

    public void Stop() {

        isPlaying = false;
        Log.d(TAG, "SoundPlayStop");
    }

}
