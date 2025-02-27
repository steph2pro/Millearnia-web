import React from "react";
import { Button } from "../components/ui/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RetryComponent = ({ onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md p-6 text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <CardTitle className="text-lg text-red-600">Erreur de Chargement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">
            Une erreur s'est produite lors du chargement des données. Veuillez réessayer.
          </p>
          <Button onClick={onRetry} className="w-full">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetryComponent;
