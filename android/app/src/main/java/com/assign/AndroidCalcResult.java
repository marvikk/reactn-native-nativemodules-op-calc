package com.assign;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import com.facebook.react.bridge.Callback;

public class AndroidCalcResult extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    // private Callback resultCallback = null;

    AndroidCalcResult(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        // reactContext.addActivityEventListener(activityEventListener);
    }

    @Override
    public String getName() {
        return "AndroidCalcResult";
    }

    @ReactMethod
    public void performCalc(int firstNumber, int secondNumber, String operation, Callback callback) {
        String result = null;
        switch (operation) {
            case "Addition":
                result = String.valueOf(firstNumber + secondNumber);
                break;
            case "Subtraction":
                result = String.valueOf(firstNumber - secondNumber);
                break;
            case "Multiplication":
                result = String.valueOf(firstNumber * secondNumber);
                break;
            case "Division":
                result = secondNumber != 0 ? String.valueOf(firstNumber / secondNumber) : "Don't divide by zero";
                break;
        }
        callback.invoke(result);
    }

}
