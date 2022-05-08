package hr.fer.progi.MyVinylCollection.util;

public final class CurrencyUtil {

    private CurrencyUtil() {
        throw new UnsupportedOperationException();
    }

    private static final double EXCHANGE_RATE_KN_TO_EURO = 0.13;

    public static String convertToEuro(double priceHrk) {
        return String.valueOf(priceHrk*EXCHANGE_RATE_KN_TO_EURO);
    }
}
