//
//  IOSCalcResult.m
//  assign
//
//  Created by Me on 2022. 03. 14..
//
//  RCTCalendarModule.h

#import <React/RCTLog.h>
#import "IOSCalcResult.h"

@implementation IOSCalcResult

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE(IOSCalcResult);

RCT_EXPORT_METHOD(performCalc:(int)num1:(int)num2:(NSString *)operation:(RCTResponseSenderBlock)callback)
{

  if ([operation isEqualToString:@"Addition"])
  {
    callback(@[[NSNumber numberWithInt:(num1+num2)]]);
  }
  else if ([operation isEqualToString:@"Subtraction"])
  {
    callback(@[[NSNumber numberWithInt:(num1-num2)]]);
  }
  else if ([operation isEqualToString:@"Multiplication"])
  {
    callback(@[[NSNumber numberWithInt:(num1*num2)]]);
  }
  else if ([operation isEqualToString:@"Division"])
  {
    if(num2!=0){
    callback(@[[NSNumber numberWithFloat:(num1/num2)]]);
    }
    else{
      callback(@[[NSString stringWithString:@"Cannot divide by zero"]]);
    }
  }
}
//    callback(@[[NSNull null], [NSNumber numberWithFloat:(num1/num2)]]);

@end

