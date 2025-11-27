#!/bin/bash
cd /home/kavia/workspace/code-generation/checkout-stepper-application-3685-3694/frontend_checkout_stepper
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

