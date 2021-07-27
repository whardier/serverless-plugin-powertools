# serverless-plugin-powertools

## Short and sweet

Currently this plugin exposes the following variable resolvers that offer type casting, boolean operations, and
conditional continuations.

Example:

```yaml
custom:
  something: true
  boolyStuff:
    makeSureThisIsBooly: ${castToBool('yes')}
    doTheOppositeOfFalse: ${negateBool('false')}
    doTheOppositeOfSomething: ${negateBool(${self:custom.something})}
  stringyStuff:
    makeSureThisIsStringy: ${castToString(1234)}
  integeryStuff:
    makeSureThisIsInteger: ${castToInteger('300')}
  continuationSupport:
    ifThisIsntAnIntegerThenUseDefault: ${castToIntegerOrContinue('eggsammich'), 0}
  noContinuationSupport:
    ifThisIsntAnIntegerThenUseDefault: ${castToIntegerOrContinue('42'), 0}
  conditionalAwesomeness:
    thisOrThat: ${isTruthy('true'), 'this'}${isTruthy('false'), 'that'}
```

Output:

```yaml
custom:
  something: true
  boolyStuff:
    makeSureThisIsBooly: true
    doTheOppositeOfFalse: true
    doTheOppositeOfSomething: false
  stringyStuff:
    makeSureThisIsStringy: '1234'
  integeryStuff:
    makeSureThisIsInteger: 300
  continuationSupport:
    ifThisIsntAnIntegerThenUseDefault: 0
  noContinuationSupport:
    ifThisIsntAnIntegerThenUseDefault: 42
  conditionalAwesomeness:
    thisOrThat: this
```
