# serverless-plugin-powertools

## Variable Resolvers

For good use cases check out `tests/unit/lib/configuration/variables`.

Current list of provided resolvers:

- `castToBool`
- `castToInteger`
- `castToString`
- `castToBoolOrContinue`
- `castToIntegerOrContinue`
- `castToStringOrContinue`
- `negateBool`
- `negateBoolOrContinue`
- `isTruthy`
- `isFalsy`

## To what end?

Currently this plugin exposes the following variable resolvers that offer type casting, boolean operations, and
conditional continuations.

You can use them to ensure that external values from the environment, CloudFormation outputs, and external parameter
stores are cast to the appropriate value. One important use case is defining bucket sizes through the environment or an
external parameter that should ideally be an integer once rendered.

Simple conditional rendering support is provided through `isTruthy` and `isFalsy`.

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
